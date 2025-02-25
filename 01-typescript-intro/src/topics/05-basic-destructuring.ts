interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: "Crimen",
  details: {
    author: "Gustavo Cerati",
    year: 2006,
  },
};

const song = "New Song";

const { song: anotherSong, songDuration: duration, details } = audioPlayer;

const { author } = details;

console.log("Song: ", anotherSong);
console.log("Duration: ", duration);
console.log("Author: ", author);

const [, , trunks = "Not Found"]: string[] = ["Goku", "Vegeta"];

console.log("Trunks: ", trunks);
