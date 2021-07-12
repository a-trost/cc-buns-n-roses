import React from "react";
import Credit from "../../components/Credit";

const MenuGrid = ({ slice }) => {
  return (
    <section className="food-menu">
      <Disclaimer />
      <h2>Menu</h2>
      <ul>
        {slice?.items?.map(({ title, description, image }, i) => (
          <>
            {(title || description || image) && (
              <li>
                <div className="card">
                  {image && <img src={image.url} alt={image.alt} />}
                  <span>{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            )}
          </>
        ))}
      </ul>
      <Credit
        author="Stephanie Eckles"
        twitter="https://twitter.com/5t3ph"
        codepen="https://codepen.io/5t3ph/pen/OJpYWyK"
        youtube="https://youtu.be/eEXhvtV4hkg"
      />
    </section>
  );
};

const Disclaimer = () => {
  return (
    <div className="absolute max-w-md px-4 py-2 text-base text-red-500 bg-black bg-opacity-50 top-2 left-2">
      Best consumed in Chrome Canary with "Container Queries" turned on under
      chrome://flags
    </div>
  );
};

MenuGrid.displayName = MenuGrid;

export default MenuGrid;
