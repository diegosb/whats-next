import React from 'react'

const categoryTypes = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film-Noir',
  'History',
  'Horror',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western',
  'Art-house',
  'Black-Comedy',
  'Chick-flick',
  'Cult-classNameic',
  'Dark-Comedy',
  'Epic',
  'Erotic',
  'Experimental',
  'Fairy-tale',
  'Film-within-a-film',
  'Futuristic',
  'Gangster',
  'Heist',
  'Historical',
  'Holiday',
  'Indie',
  'Juvenile',
  'Melodrama',
  'Monster',
  'Political',
  'Psychological',
  'Road-movie',
  'Satire',
  'Science-Fiction',
  'Slapstick',
  'Social-issue',
  'Superhero',
  'Surreal',
  'Teen',
  'Vampire',
  'Zombie',
].sort((a, b) => a.localeCompare(b))
const cinemaTypes = [
  { value: 'tv show', title: 'TV Show' },
  { value: 'movie', title: 'Movie' },
  { value: 'tv show or movie', title: 'No Preference' },
]

interface FormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
}

export default function Form(props: FormProps) {
  const formRef = React.useRef<HTMLFormElement>(null)

  return (
    <form
      className="my-10 grid grid-cols-1 gap-y-8"
      ref={formRef}
      onSubmit={e => {
        e.preventDefault()
        props.onSubmit(e)
        formRef.current?.reset()
      }}
    >
      <fieldset className="sm:col-span-4">
        <label
          htmlFor="kind"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          What kind of cinema are you searching for?
        </label>
        <div className="mt-2">
          <select
            id="kind"
            name="kind"
            className="block w-full rounded-md px-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            {cinemaTypes.map(cinemaType => (
              <option key={cinemaType.value} value={cinemaType.value}>
                {cinemaType.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset className="sm:col-span-4">
        <legend className="block text-sm font-medium leading-6 text-gray-900">
          Select all categories that you want the show or movie to include.
        </legend>
        <div className="grid justify-start gap-2 my-4 grid-cols-4">
          {categoryTypes.map(categoryType => (
            <div className="flex items-center" key={categoryType}>
              <input
                type="checkbox"
                id={categoryType}
                value={categoryType}
                name="categories"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={categoryType}
                className="ml-3 min-w-0 flex-1 text-gray-600"
              >
                {categoryType}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      <fieldset className="sm:col-span-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Write any other specifications here. Be as picky as you'd like.
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Ex. Must have at least 2 seasons and be on Netflix or Hulu."
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </fieldset>
      <fieldset className="sm:col-span-4">
        <button
          type="submit"
          className={`${
            props.loading
              ? 'bg-indigo-400 cursor-not-allowed'
              : 'bg-indigo-500 hover:bg-indigo-600'
          } mt-4 w-full h-10 text-white font-bold p-3 rounded flex items-center justify-center`}
          disabled={props.loading}
        >
          {props.loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </>
          ) : (
            <p>Curate My List</p>
          )}
        </button>
      </fieldset>
    </form>
  )
}
