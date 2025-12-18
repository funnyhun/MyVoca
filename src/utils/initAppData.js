const dummyProgress = (duration, setStatus) => {
  const steps = 100;
  const interval = duration / steps;
  let currentStep = 0;

  return new Promise((res) => {
    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(99, Math.floor((currentStep / steps) * 99));

      setStatus(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        res();
      }
    }, interval);
  });
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const initWordMap = async (length, bundle) => {
  let wordNode = Array.from({ length: length }, (_, i) => i);
  const randomWordNode = shuffleArray(wordNode);

  const map = [];
  let idx = 0;
  let mapId = 1;

  while (idx < length) {
    const chunk = randomWordNode.slice(idx, idx + bundle);

    map.push({
      id: mapId++,
      word: chunk,
      length: chunk.length,
      done: false,
    });

    idx += bundle;
  }

  window.localStorage.setItem("wordMap", JSON.stringify(map));
};

const initUserData = async () => {
  const now = new Date();

  const UserData = {
    startedTime: now.setHours(0, 0, 0, 0),
    continued: 0,
    today: 0,
    learned: 0,
  };

  window.localStorage.setItem("userData", JSON.stringify(UserData));
};

export const initAppData = async (length, bundleSize, setStatus) => {
  await Promise.all([initWordMap(length, bundleSize), initUserData(), dummyProgress(1500, setStatus)]);
  setStatus(100);
  return true;
};
