document.addEventListener('DOMContentLoaded', () => {
  new p5((p) => {
    let spheres = [];
    const MAX_SPHERES = 140;
    let cnv;

    p.setup = function() {
      const holder = document.getElementById('sketch-holder');
      const w = Math.max(50, holder.clientWidth);
      const h = Math.max(50, holder.clientHeight);
      cnv = p.createCanvas(w, h);
      cnv.parent(holder);
      // asegurar que el canvas quede exactamente encima del contenido del div
      cnv.elt.style.position = 'absolute';
      cnv.elt.style.top = '0';
      cnv.elt.style.left = '0';
      cnv.elt.style.width = '100%';
      cnv.elt.style.height = '100%';
      cnv.elt.style.background = 'transparent';
      cnv.elt.style.display = 'block';
      cnv.elt.style.pointerEvents = 'auto';
      p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
      p.noStroke();
    };

    p.windowResized = function() {
      const holder = document.getElementById('sketch-holder');
      p.resizeCanvas(Math.max(50, holder.clientWidth), Math.max(50, holder.clientHeight));
    };

    p.draw = function() {
      p.clear();

      if (isMouseInsideCanvas()) {
        if (p.random() < 0.45) spawnSphere(p.mouseX + p.random(-6, 6), p.mouseY + p.random(-6, 6));
        if (p.random() < 0.06) spawnSphere(p.mouseX + p.random(-40, 40), p.mouseY + p.random(-40, 40));
      }

      for (let i = spheres.length - 1; i >= 0; i--) {
        spheres[i].update();
        spheres[i].display();
        if (spheres[i].dead) spheres.splice(i, 1);
      }

      if (spheres.length > MAX_SPHERES) spheres.splice(0, spheres.length - MAX_SPHERES);
    };

    function isMouseInsideCanvas() {
      return (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height);
    }

    function spawnSphere(x, y) {
      const r = p.random(18, 68) * (p.map(p.noise(x * 0.01, y * 0.01), 0, 1, 0.85, 1.15));
      spheres.push(new Sphere(x, y, r));
    }

    function Sphere(x, y, r) {
      this.pos = p.createVector(x, y);
      this.vel = p5.Vector.random2D().mult(p.random(0.2, 1.8));
      this.r = r;
      this.age = 0;
      this.lifespan = p.random(240, 720);
      this.dead = false;
      this.tint = p.color(220 + p.random(-10, 10), 250 + p.random(-30, 0), 245 + p.random(-20, 10), 200);
      this.freq = p.random(0.01, 0.04);

      this.update = function() {
        this.pos.add(this.vel);
        this.vel.mult(0.995);

        if (this.pos.x < this.r / 2) { this.pos.x = this.r / 2; this.vel.x *= -0.6; }
        if (this.pos.x > p.width - this.r / 2) { this.pos.x = p.width - this.r / 2; this.vel.x *= -0.6; }
        if (this.pos.y < this.r / 2) { this.pos.y = this.r / 2; this.vel.y *= -0.6; }
        if (this.pos.y > p.height - this.r / 2) { this.pos.y = p.height - this.r / 2; this.vel.y *= -0.6; }

        this.age++;
        if (this.age > this.lifespan) {
          this.r *= 0.985;
          if (this.r < 2) this.dead = true;
        }

        if (isMouseInsideCanvas()) {
          const d = p.dist(this.pos.x, this.pos.y, p.mouseX, p.mouseY);
          if (d < 160) {
            const pull = p5.Vector.sub(p.createVector(p.mouseX, p.mouseY), this.pos).mult(0.0008 * (160 - d));
            this.vel.add(pull);
          }
        }
      };

      this.display = function() {
        p.push();
        p.translate(this.pos.x, this.pos.y);

        const ctx = p.drawingContext;
        ctx.save();

        const rad = this.r;
        const grad = ctx.createRadialGradient(0, 0, rad * 0.08, 0, 0, rad);
        const rr = p.red(this.tint);
        const gg = p.green(this.tint);
        const bb = p.blue(this.tint);

        grad.addColorStop(0.0, `rgba(${rr},${gg},${bb},0.95)`);
        grad.addColorStop(0.45, `rgba(${rr},${gg},${bb},0.42)`);
        grad.addColorStop(0.78, `rgba(255,255,255,0.12)`);
        grad.addColorStop(1.0, `rgba(180,200,200,0.04)`);

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(0, 0, rad, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = Math.max(0.4, rad * 0.02);
        ctx.strokeStyle = `rgba(255,255,255,${0.04 + 0.02 * Math.sin(p.frameCount * 0.02 * this.freq)})`;
        ctx.beginPath();
        if (ctx.ellipse) {
          ctx.ellipse(-rad * 0.05, -rad * 0.08, rad * 0.9, rad * 0.55, -0.2, 0, Math.PI * 2);
          ctx.stroke();
        }

        let hx = -rad * 0.28 + Math.sin(p.frameCount * 0.03 * this.freq) * (rad * 0.01);
        let hy = -rad * 0.28 + Math.cos(p.frameCount * 0.02 * this.freq) * (rad * 0.01);
        let hr = rad * 0.42;
        for (let i = 0; i < 6; i++) {
          const alphaVal = 0.08 - i * 0.012;
          if (alphaVal <= 0) break;
          ctx.fillStyle = `rgba(255,255,255,${alphaVal})`;
          ctx.beginPath();
          if (ctx.ellipse) {
            ctx.ellipse(hx, hy, hr - i * (rad * 0.06), (hr - i * (rad * 0.06)) * 0.6, 0, 0, Math.PI * 2);
          } else {
            ctx.arc(hx, hy, hr - i * (rad * 0.06), 0, Math.PI * 2);
          }
          ctx.fill();
        }

        ctx.restore();

        p.noFill();
        p.strokeWeight(1);
        p.stroke(255, 255, 255, 12);
        p.ellipse(0, 0, rad * 2, rad * 2);

        p.pop();
      };
    }
  });
});

document.querySelector('canvas').width
document.getElementById('sketch-holder').clientWidth
