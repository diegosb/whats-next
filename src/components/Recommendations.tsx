import { forwardRef } from 'react'
import type { RecommendationsCardProps } from './RecommendationCard'
import RecommendationsCard from './RecommendationCard'

interface RecommendationsProps {
  recommendations: RecommendationsCardProps[]
}

const Recommendations = forwardRef<HTMLDivElement, RecommendationsProps>(
  (props, ref) => {
    return (
      <div className="recommendations flex gap-4 direction flex-col" ref={ref}>
        {props.recommendations.map(recomendation => (
          <RecommendationsCard {...recomendation} />
        ))}
      </div>
    )
  },
)

export default Recommendations
