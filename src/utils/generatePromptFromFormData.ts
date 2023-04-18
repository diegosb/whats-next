export default function generatePromptFromFormData(formData: FormData): string {
  const description = formData.get('description') as string
  const type = formData.get('description') as string
  const categories = formData.getAll('categories') as string[]

  const fullSearchCriteria = `Give me a list of 5 ${type} recommendations ${
    categories
      ? `that fit all of the following categories: ${categories
          .map(category => category.toLowerCase())
          .join(', ')}`
      : ''
  }. ${
    description
      ? `Make sure it fits the following description as well: ${description}.`
      : ''
  } ${
    categories || description
      ? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${type}'s that I might like.`
      : ''
  } Please return this response as a not numbered list with the ${type}'s title, followed by a colon, and then a brief description of the ${type}. There should be a line of whitespace between each item in the list.`
  return fullSearchCriteria
}
