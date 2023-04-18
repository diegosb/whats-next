export function getRecommendationInfo(recommendation: string): {
  title: string
  description: string
} {
  const [title, description] = recommendation
    .split(/\s*(.*?):\s*(.*)/)
    .filter(Boolean)

  return { title, description }
}
