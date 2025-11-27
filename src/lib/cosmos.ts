import { CosmosClient } from '@azure/cosmos'
import { config } from '@/config'
import { RSVPSubmission, GuestListDocument, SafeGuestData } from '@/app/interfaces/guest'

// Create a singleton instance of the CosmosClient
const client = new CosmosClient({
  connectionString: config.cosmos.connectionString,
})

// Get the database and container
export const database = client.database(config.cosmos.databaseName)
export const guestsContainer = database.container(config.cosmos.containerName)
export const rsvpsContainer = database.container(
  config.cosmos.rsvpsContainerName,
)

// Helper function to get a guest by ID
export async function getGuestById(id: string) {
  try {
    const querySpec = {
      query: 'SELECT * FROM c WHERE c.id = @id',
      parameters: [
        {
          name: '@id',
          value: id,
        },
      ],
    }
    const { resources } = await guestsContainer.items
      .query(querySpec)
      .fetchAll()
    return resources[0] || null
  } catch (error) {
    console.error('Error fetching guest from Cosmos DB:', error)
    return null
  }
}

// Helper function to save RSVP submission
export async function saveRSVPSubmission(rsvpData: RSVPSubmission) {
  try {
    const { resource } = await rsvpsContainer.items.create(rsvpData)
    return resource
  } catch (error) {
    console.error('Error saving RSVP submission to Cosmos DB:', error)
    throw error
  }
}

// Helper function to get all RSVP submissions
export async function getAllRSVPs() {
  try {
    const querySpec = {
      query: 'SELECT * FROM c ORDER BY c.submittedAt DESC',
    }
    const { resources } = await rsvpsContainer.items
      .query(querySpec)
      .fetchAll()
    return resources as RSVPSubmission[]
  } catch (error) {
    console.error('Error fetching RSVPs from Cosmos DB:', error)
    throw error
  }
}

// Helper function to get all guests (without addresses)
export async function getAllGuests(): Promise<SafeGuestData[]> {
  try {
    // Query all guests - we'll sort in JavaScript to handle missing fields gracefully
    const querySpec = {
      query: 'SELECT * FROM c',
    }
    const { resources } = await guestsContainer.items
      .query(querySpec)
      .fetchAll()
    
    // Remove address field from each guest document and sort
    const safeGuests = resources.map((guest: GuestListDocument) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { address, ...safeGuest } = guest
      return safeGuest as SafeGuestData
    })
    
    // Sort by list (defaulting to empty string if missing), then by sortName
    return safeGuests.sort((a, b) => {
      const listA = a.list || ''
      const listB = b.list || ''
      if (listA !== listB) {
        return listA.localeCompare(listB)
      }
      const sortNameA = a.sortName || ''
      const sortNameB = b.sortName || ''
      return sortNameA.localeCompare(sortNameB)
    })
  } catch (error) {
    console.error('Error fetching guests from Cosmos DB:', error)
    throw error
  }
}