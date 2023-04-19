import ErrorMessage from './ErrorMessage'
import React from 'react'
import Form from './Form'
import Recommendations from './Recommendations'
import type { RecommendationsCardProps } from './RecommendationCard'
import generatePromptFromFormData from 'utils/generatePromptFromFormData'
import { getRecommendationInfo } from 'utils/getRecommendationInfo'

export default function App() {
  const [error, setError] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [recommendations, setRecommendations] = React.useState<
    RecommendationsCardProps[]
  >([])
  const recommendationsRef = React.useRef<HTMLDivElement>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true)
    setError('')
    setRecommendations([])
    let searchResponse = ''
    const formData = new FormData(e.target as HTMLFormElement)
    const fullSearchCriteria = generatePromptFromFormData(formData)

    const response = await fetch('/api/getRecommendations', {
      method: 'POST',
      body: JSON.stringify({ searched: fullSearchCriteria }),
      headers: {
        'content-type': 'application/json',
      },
    })
    if (response.ok) {
      try {
        const data = response.body
        if (!data) {
          return
        }
        const reader = data.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { value, done } = await reader.read()
          const chunkValue = decoder.decode(value)
          searchResponse += chunkValue
          const copyResponse = searchResponse

          const recommendationBlocks = copyResponse?.split('\n').filter(Boolean)
          recommendationBlocks.forEach((recommendation, i) => {
            const { title, description } = getRecommendationInfo(recommendation)
            setRecommendations(prevState => {
              const newRecommendations = [...prevState]
              newRecommendations[i] = { title, description }
              return newRecommendations
            })
            recommendationsRef.current?.scrollIntoView()
          })

          if (done) {
            break
          }
        }
      } catch (err) {
        setError('Looks like OpenAI timed out 💔')
      }
    } else {
      const errorResponse = await response.text()
      setError(errorResponse)
    }
    setLoading(false)
  }

  return (
    <>
      <Form onSubmit={onSubmit} loading={loading} />
      <Recommendations
        recommendations={recommendations}
        ref={recommendationsRef}
      />
      <ErrorMessage message={error} />
    </>
  )
}
