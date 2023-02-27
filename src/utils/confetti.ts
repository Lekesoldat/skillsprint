import { confetti } from "tsparticles-confetti";

const shoot = () => {
  void confetti({
    particleCount: 50,
    angle: 60,
    startVelocity: 60,
    spread: 55,
    origin: { x: 0 },
  });

  void confetti({
    particleCount: 50,
    angle: 120,
    startVelocity: 60,
    spread: 55,
    origin: { x: 1 },
  });
};

export const starsConfetti = (amount = 3) => {
  for (let i = 0; i < amount; i++) {
    setTimeout(shoot, 200 * i);
  }
};
