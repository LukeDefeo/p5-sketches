import p5 from "p5";
import {Sketch} from "../../lib/SketchComponentClass";

type ParticleType = 'red' | 'green' | 'yellow'

interface Particle {

  x: number,
  y: number,
  vx: number,
  vy: number,
  // hue: number,
  size: number,
  influenceRadius: number,
  // type: ParticleType

}

function particle(p: p5, type): Particle {
  return {
    x: p.random(0, p.width),
    y: p.random(0, p.height),
    vx: p.random(-1, 1),
    vy: p.random(-1, 1),
    // hue: 50,
    size: 10,
    influenceRadius: 40,
    // type: type
  }
}

export class Balls implements Sketch {
  private particles: Particle[] = []

  setup(p: p5): void {
    // this.particles = Array.from({length: 20}, (x, i) => particle(p, p.random(['red', 'green', 'yellow'])));
    this.particles = [
      {
        x: 40,
        y:40,
        vx: 1,
        vy: 1,
        size: 10,
        influenceRadius: 40,

      },

      {
        x: 100,
        y:140,
        vx: 0,
        vy: -1,
        size: 10,
        influenceRadius: 40,

      }

    ]
    p.rect(100, 100, 100, 100)
  }

  draw(p: p5): void {

    p.clear()
    p.colorMode(p.HSB)

    for (const particle of this.particles) {

      for (const otherParticle of this.particles) {
        if (otherParticle === particle) continue

        if (otherParticle.x - particle.x < particle.influenceRadius) {

        }

      }
      //bounds check
      const halfSize = particle.size / 2;

      if (particle.x > p.width - halfSize || particle.x < halfSize) {
        particle.vx = -particle.vx
      }
      if (particle.y > p.height - halfSize || particle.y < halfSize) {
        particle.vy = -particle.vy
      }

      particle.x += particle.vx
      particle.y += particle.vy
      // p.fill(particle.hue, 100, 100)


      p.circle(particle.x, particle.y, particle.size)
      p.noFill()
      p.circle(particle.x,particle.y,particle.influenceRadius)
      // for (let a = 0; a < p.TWO_PI; a += p.TWO_PI / 10) {
      //   p.ellipse(particle.x + particle.size * p.cos(a), particle.x + particle.size * p.sin(a), 5, 5);
      // }
    }

  }

}
