import { CosmosClient } from '@azure/cosmos'
import { config } from '@/config'
import { RSVPSubmission } from '@/app/interfaces/guest'

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