import React, { useState, useEffect, useRef } from "react";

import Matter from "matter-js";

console.clear();

const LOGO = "https://assets.codepen.io/39255/buns+n+roses.png";

function Slice({ slice }) {
  const [intro, setIntro] = useState(true);

  return (
    <div className="burger-maker" onClick={() => setIntro(false)}>
      <h2 className="m-auto text-4xl text-center font-display md:text-6xl">
        {slice.primary.heading}
      </h2>
      <div className="logo" data-intro={intro}>
        <img src={LOGO} />
      </div>
      <BurgerMaker show={!intro} />
    </div>
  );
}

const COLORS = {
  BUN: "#48534D",
  PATTY: "#805126",
  CHEESE: "#F8C742",
  PICKLES: "#89BD47",
  LETTUCE: "#27B047",
};

const {
  Engine,
  Render,
  Mouse,
  MouseConstraint,
  Runner,
  Body,
  Bodies,
  Composite,
  Composites,
  Constraint,
} = Matter;

function makeChain({
  color,
  links = 5,
  x = 0,
  y = 0,
  width = 380,
  height = 30,
  options = {},
}) {
  var group = Body.nextGroup(true);
  var linkWidth = width / links;
  var chain = Composites.stack(x, y, links, 1, 10, 10, function (x, y) {
    return Bodies.rectangle(x - linkWidth, y, linkWidth, height, {
      collisionFilter: { group: group },
      chamfer: 5,
      ...options,
      render: {
        fillStyle: color,
        ...options?.render,
      },
    });
  });

  Composites.chain(chain, 0.35, 0, -0.35, 0, {
    stiffness: 1,
    length: 0,
    render: {
      fillStyle: null,
      strokeStyle: "transparent",
    },
  });

  return chain;
}

function BurgerMaker({ show }) {
  const canvas = useRef();
  const world = useRef();
  const engineRef = useRef();

  useEffect(() => {
    if (show && canvas.current && !world.current) {
      // create an engine
      var engine = Engine.create();
      engineRef.current = engine;
      world.current = engine.world;

      console.log("Creating world!");

      // create a renderer
      var render = Render.create({
        canvas: canvas.current,
        engine: engine,
        options: {
          width: 500,
          height: 500,
          background: "transparent",
          //showAngleIndicator: true,
          //showCollisions: true,
          //showVelocity: true,
          showAxes: false,
          wireframes: false,
        },
      });

      var ground = Bodies.rectangle(0, 600, 1000, 20, { isStatic: true });

      // add all of the bodies to the world
      Composite.add(engine.world, [ground]);

      // add mouse control
      var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: {
            stiffness: 0.2,
            render: {
              visible: false,
            },
          },
        });

      Composite.add(engine.world, mouseConstraint);

      // keep the mouse in sync with rendering
      render.mouse = mouse;

      // run the renderer
      Render.run(render);

      Render.lookAt(render, {
        min: { x: -300, y: 0 },
        max: { x: 300, y: 600 },
      });

      // create runner
      var runner = Runner.create();

      // run the engine
      Runner.run(runner, engine);

      return () => {
        Runner.stop();
        Engine.destroy();
      };
    }
  }, [show, canvas, world]);

  useEffect(() => {
    if ((show, world.current)) {
      initialBurger();
    }
  }, [show, world.current]);

  function initialBurger() {
    addBun();
    setTimeout(addPatty, 400);
  }

  function addBun(opts) {
    const bun = makeChain({
      color: COLORS.BUN,
      width: 340,
      links: 3,
      y: 30,
      x: 30,
      height: 30,
      ...opts,
    });
    Composite.add(world.current, [bun]);
  }

  function addCheese() {
    const cheese = makeChain({ color: COLORS.CHEESE, height: 20 });
    Composite.add(world.current, [cheese]);
  }

  function addPatty() {
    const patty = makeChain({ color: COLORS.PATTY, height: 40 });
    Composite.add(world.current, [patty]);
  }

  function addLettuce() {
    const lettuce = makeChain({ color: COLORS.LETTUCE, height: 10 });
    Composite.add(world.current, [lettuce]);
  }

  function addPickles() {
    const pickle1 = makeChain({
      width: 80,
      x: -90,
      y: -10,
      height: 10,
      links: 2,
      color: COLORS.PICKLES,
    });
    const pickle2 = makeChain({
      width: 80,
      height: 10,
      links: 2,
      color: COLORS.PICKLES,
    });
    const pickle3 = makeChain({
      width: 80,
      x: 90,
      y: -10,
      height: 10,
      links: 2,
      color: COLORS.PICKLES,
    });
    Composite.add(world.current, [pickle1, pickle2, pickle3]);
  }

  function addToOrder() {
    engineRef.current.gravity.y = -2;

    setTimeout(() => {
      Composite.clear(world.current, true);
      engineRef.current.gravity.y = 1;
      initialBurger();
    }, 2000);
  }

  return (
    <div>
      <canvas ref={canvas} width="500" height="500" />

      <div className="controls">
        <button
          className="gh-button"
          onClick={addPatty}
          style={{ "--color": COLORS.PATTY }}
        >
          Patty
        </button>
        <button
          className="gh-button"
          onClick={addCheese}
          style={{ "--color": COLORS.CHEESE }}
        >
          Cheese
        </button>
        <button
          className="gh-button"
          onClick={addLettuce}
          style={{ "--color": COLORS.LETTUCE }}
        >
          Lettuce
        </button>
        <button
          className="gh-button"
          onClick={addPickles}
          style={{ "--color": COLORS.PICKLES }}
        >
          Pickles
        </button>
        <button
          className="gh-button"
          onClick={addBun}
          style={{ "--color": COLORS.BUN }}
        >
          Bun
        </button>
      </div>

      <div className="controls">
        <button onClick={addToOrder} className="add-order-button">
          Add to Order
        </button>
      </div>
    </div>
  );
}

Slice.displayName = BurgerMaker;

export default Slice;
