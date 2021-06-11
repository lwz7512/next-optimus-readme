/**
 * Hero Banner
 * @2021/06/10
 */

export default function HeroBanner({title, description, imageURL}) {

  return (
    <div className="blankslate align-to-top d-flex flex-column flex-justify-center">
      <img src={imageURL} className="hero-image" />
      <h1 className="mt-4 mb-4 color-text-white">
        {title}
      </h1>
      <h3 className="color-text-white text-normal">
        {description}
      </h3>
    </div>
  )
}