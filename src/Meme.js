import React from "react";

export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "",
  });

  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  function generateMeme() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    setMeme((prevState) => ({
      ...prevState,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const target = event.target.name;

    setMeme((prevState) => {
      return {
        ...prevState,
        [target]: event.target.value,
      };
    });
  }

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
