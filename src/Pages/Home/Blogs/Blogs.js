import React from 'react';

const Blogs = () => {
    return (
        <div className="question-blog  mx-12 m-20 rounded-t-sm text-gray-900 font-semibold  bg-slate-400">
        <div className="question px-8 py-4">
          <h1 className="text-xl font-semibold">Question 1 : What are the different ways to manage a state in a react application ?</h1>
          <p>
            Ans : Different ways to handle state in React applications , URL , Web Storage , Local State , Lifted State , Derived State.
          </p>
          <br />
          <hr />
          <br />
          <h1 className="text-xl font-semibold">Question 2 : How does prototypical inheritance work ?</h1>
          <p>
            Ans : The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object.
          </p>
          <br />
          <hr />
          <br />
          <h1 className="text-xl font-semibold">
            Question 3 : React vs Angular vs Vue ?{" "}
          </h1>
          <p>
            Ans : Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option.
          </p>
        </div>
      </div>
    );
};

export default Blogs;