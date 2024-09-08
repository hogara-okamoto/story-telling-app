"use client";

import { useState } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, append, isLoading } = useChat();
  const genres = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];
  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];
  const characters = [
    { 
      emoji: "👦", 
      value: "Taro", 
      description: "A brave young boy with a heart of gold.",
      personality: "Adventurous and kind-hearted"
    },
    { 
      emoji: "🧔", 
      value: "Mikel", 
      description: "A wise old mentor with a mysterious past.",
      personality: "Patient and enigmatic"
    },
    { 
      emoji: "🐱", 
      value: "Moco", 
      description: "A mischievous cat with the ability to speak.",
      personality: "Witty and unpredictable"
    },
    { 
      emoji: "👧", 
      value: "Ray", 
      description: "A quick-witted girl with a talent for invention.",
      personality: "Curious and innovative"
    },
  ];

  const [state, setState] = useState({
    genre: "",
    tone: "",
    character: "",
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Story Telling App</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Customize the story by selecting the genre, tone and character.
            </p>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Genre</h3>

            <div className="flex flex-wrap justify-center">
              {genres.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    value={value}
                    name="genre"
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Tones</h3>

            <div className="flex flex-wrap justify-center">
              {tones.map(({ value, emoji }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={value}
                    type="radio"
                    name="tone"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={value}>
                    {`${emoji} ${value}`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
            <h3 className="text-xl font-semibold">Characters</h3>

            <div className="flex flex-wrap justify-center">
              {characters.map(({ value, emoji, description }) => (
                <div
                  key={value}
                  className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg"
                >
                  <input
                    id={`character-${value}`}
                    type="radio"
                    name="character"
                    value={value}
                    onChange={handleChange}
                  />
                  <label className="ml-2" htmlFor={`character-${value}`}>
                    {`${emoji} ${value}`}
                  </label>
                  <p className="mt-2 text-sm text-gray-300">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            disabled={isLoading || !state.genre || !state.tone || !state.character}
            onClick={() => {
              const selectedCharacter = characters.find(char => char.value === state.character);
              append({
                role: "user",
                content: `Generate a 250-word ${state.genre} story in a ${state.tone} tone featuring ${state.character}. 
                Character description: ${selectedCharacter?.description}
                Character personality: ${selectedCharacter?.personality}
                Please ensure the story is approximately 250 words long.`
              })
            }}
          >
            Generate Story
          </button>

          <div
            hidden={
              messages.length === 0 ||
              messages[messages.length - 1]?.content.startsWith("Generate")
            }
            className="bg-opacity-75 bg-gray-700 rounded-lg p-4"
          >
            {messages[messages.length - 1]?.content}
          </div>
          <div>
            {state.character && (
                <div className="mt-4 bg-opacity-75 bg-gray-700 rounded-lg p-4">
                  <h4 className="text-lg font-semibold mb-2">Selected Character Details</h4>
                  {(() => {
                    const selectedCharacter = characters.find(char => char.value === state.character);
                    return (
                      <>
                        <p className="text-gray-300 mb-2">
                          <span className="font-bold">Name:</span> {selectedCharacter?.value}
                        </p>
                        <p className="text-gray-300">
                          <span className="font-bold">Description:</span> {selectedCharacter?.description}
                        </p>
                        <p className="text-gray-300 mt-1">
                          <span className="font-bold">Personality:</span> {selectedCharacter?.personality}
                        </p>
                      </>
                    );
                  })()}
                </div>
              )}
          </div>
        </div>
      </div>
    </main>
  );
}