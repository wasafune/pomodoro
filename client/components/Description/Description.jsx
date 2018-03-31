import React from 'react';

const para1 = 'The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are named pomodoros, the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student.';

const para2 = 'The technique has been widely popularized by dozens of apps and websites providing timers and instructions. Closely related to concepts such as timeboxing and iterative and incremental development used in software design, the method has been adopted in pair programming contexts.';

const Description = () => (
  <div id="description">
    <h2>About the Pomodoro Method</h2>
    <p>
      &nbsp;&nbsp;&nbsp;{para1}
      <br /> <br />
      &nbsp;&nbsp;&nbsp;{para2}
      <br />
    </p>
    <p id="source">
      Source:&nbsp;
      <a
        href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
        target="_blank"
        rel="noreferrer noopener"
      >
        Wikipedia
      </a>
    </p>
  </div>
);

export default Description;
