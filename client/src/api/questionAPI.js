const API_BASE_URL = 'http://localhost:5000/api';

export const getPaginatedQuestions = async (page, pageSize) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/questions?page=${page}&limit=${pageSize}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching paginated questions:', error);
    return { questions: [], total: 0 };
  }
};

export const postQuestion = async (payload) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error posting question:', error);
    throw error;
  }
};
