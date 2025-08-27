import apiService from './api-service';
import mockApiService from './mock-api-service';

const service =
  process.env.IS_MOCK_API === 'true' ? mockApiService : apiService;

export default service;
