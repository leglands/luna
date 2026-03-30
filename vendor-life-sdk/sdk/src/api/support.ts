export async function submitFeedback(params: {
  apiBase: string;
  jwtToken: string;
  appId: string;
  rating?: number;
  category?: string;
  message: string;
}): Promise<{ id: string }> {
  const { apiBase, jwtToken, appId, rating, category, message } = params;

  const response = await fetch(`${apiBase}/api/support/feedback`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      appId,
      rating,
      category,
      message,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Feedback submission failed: ${response.status}`);
  }

  return response.json();
}

export async function submitContact(params: {
  apiBase: string;
  jwtToken: string;
  appId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ id: string }> {
  const { apiBase, jwtToken, appId, name, email, subject, message } = params;

  const response = await fetch(`${apiBase}/api/support/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      appId,
      name,
      email,
      subject,
      message,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Contact submission failed: ${response.status}`);
  }

  return response.json();
}
