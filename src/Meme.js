import React from "react";

export default function Meme() {
  // Create a state variable that will store an empty meme object.
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  // Create a state variable that will store all the memes from the API.
  const [allMemes, setAllMemes] = React.useState([]);

  // Get all the meme data from the API.
  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  // Generate a random meme.
  function generateMeme() {
    // Get a random number within the length of the array from the API.
    const randomNumber = Math.floor(Math.random() * allMemes.length);

    // Get the URL of a random meme.
    const url = allMemes[randomNumber].url;

    // Set the image to the random URL.
    setMeme((prevState) => ({
      ...prevState,
      randomImage: url,
    }));
  }

  // Handle change function for the two text inputs. Set the text value of the meme as the input changes.
  function handleChange(event) {
    const target = event.target.name;

    setMeme((prevState) => {
      return {
        ...prevState,
        [target]: event.target.value,
      };
    });
  }

  // Return a form with two inputs that will deal with the text captions of the memes.
  // The button will generate a new meme image everytime it is clicked.
  return (
    <form>
      <div className="Form">
        <div className="InputContainer">
          <input
            type="text"
            placeholder="Top Text"
            className="TopText"
            name="topText"
            value={meme.topText}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Bottom Text"
            className="BottomText"
            name="bottomText"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={generateMeme} className="MemeButton">
          Get a new meme image
        </button>
      </div>
      <div className="ImageContainer">
        <img src={meme.randomImage}></img>
        <h2 className="meme--text topText">{meme.topText}</h2>
        <h2 className="meme--text bottomText">{meme.bottomText}</h2>
      </div>
    </form>
  );
}
