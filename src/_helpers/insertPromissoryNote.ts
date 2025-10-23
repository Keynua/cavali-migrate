import { PromissoryNote, ApiResponse } from "../_types";

/**
 * Inserts a promissory note into the CAVALI system via API.
 * Implements automatic retry logic for timeout errors.
 * 
 * @param host - API host (e.g., "api.keynua.com")
 * @param apiKey - API key for authentication
 * @param authorization - Authorization token
 * @param batchId - Unique batch identifier for this execution
 * @param contractId - Contract/loan identifier
 * @param promissoryNote - Promissory note data to insert
 * @returns Promise resolving to the API response
 */
export const insertPromissoryNote = async (
  host: string,
  apiKey: string,
  authorization: string,
  batchId: number,
  contractId: string,
  promissoryNote: PromissoryNote
): Promise<ApiResponse> => {
  let result: ApiResponse | undefined;
  const MAX_RETRIES = 50; // Maximum number of retry attempts for timeouts
  let retryCount = 0;
  
  // Retry loop: continues until we get a non-timeout response or reach max retries
  while (!result && retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(`https://${host}/cavali/v1/promissory-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          Authorization: authorization,
        },
        body: JSON.stringify({ batchId, contractId, promissoryNote }),
      });
      const body = (await response.json()) as ApiResponse;
      
      // Only accept non-timeout responses
      if (body.message !== "Endpoint request timed out") {
        result = body;
      } else {
        retryCount++;
        console.log(`Timeout received, retrying... (${retryCount}/${MAX_RETRIES})`);
      }
    } catch (error) {
      // Handle network errors or JSON parsing errors
      retryCount++;
      console.error(`Request failed (attempt ${retryCount}/${MAX_RETRIES}):`, error);
      
      // If we've exhausted retries, throw the error
      if (retryCount >= MAX_RETRIES) {
        throw new Error(`Failed after ${MAX_RETRIES} attempts: ${error}`);
      }
      
      // Wait a bit before retrying on network errors
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // If we exhausted retries without getting a result
  if (!result) {
    throw new Error(`Request timed out after ${MAX_RETRIES} attempts`);
  }
  
  return result;
};

