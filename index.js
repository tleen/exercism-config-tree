/*
Accept an Exercism track configuration object and output a track that looks
sorta like this:
...
├── binary-search [5]
|   └── binary-search-tree [5]
|
├── kindergarten-garden [3]
|   ├── tournament [3]
|   |   ├── poker [5]
|   |   |   ├── bracket-push [7]
|   |   |   |   └── forth [8]
|   |   |   └── ocr-numbers [7]
|   └── change [5]
...
*/

const EOL = require('os').EOL,
      INDENT = 3,
      sortByDifficulty = (a, b) => a.difficulty > b.difficulty;

module.exports = function exercismConfigToTree(config){
  let exercises = [...config.exercises];

  let slugToExercise = {}, // global lookup table for exercises via slug
      coreExercises = [],
      bonusExercises = [];


  exercises = exercises.map(e => {
    // make sure any exercise can have child unlocks, and that all exercises
    // are registered with the global lookup table, and that they have
    // a description we can use in the tree
    let {slug, difficulty} = e;
    e.children = [];
    slugToExercise[slug] = e
    e.description = `${slug} [${difficulty}]`;
    return e;
    // then filter out the deprecated exercises
  }).filter(e => e.hasOwnProperty('deprecated') ? !e.deprecated : true);


  // if core is set it is a core exercise
  // if not core and unlocked_by is something it is a child exercise
  // else it is floating which is considered bonus
  for(let e of exercises){
    if(e.core){
      coreExercises.push(e);
      continue;
    }

    let parent = e.hasOwnProperty('unlocked_by') ? e.unlocked_by : false;
    if(parent){
      slugToExercise[parent].children.push(e);
    }else{
      bonusExercises.push(e);
    }
  }

  // recursively create lines
  function exercisesToTreeLines(exercises, depth=0){

    let lines = [],
        trunk = '|',
        spacing = ' '.repeat(INDENT),
        branch = '─'.repeat(INDENT - 1),
        lastIndex = exercises.length - 1;

    for(let i = 0; i < exercises.length; i++){
      let line = '',
          {description, children} = exercises[i],
          fork = '├', // assume another line below...
          last = (i === lastIndex);

      // ...unless there is not
      if(last && (children.length === 0)) fork = '└';

      // create the continuing vertical line for each descent
      for(let d = 0; d < depth; d++) {
        line += trunk;
        line += spacing;
      }
      line += `${fork}${branch} ${description}`;
      lines.push(line);
      children.sort(sortByDifficulty);
      lines = lines.concat(...exercisesToTreeLines(children, depth + 1));

      // add a little more separation between the top level exercises
      if((!last) && (depth === 0)) lines.push(trunk);
    }

    return lines;
  }

  // add some spacing and titles
  let lines = [];
  lines.push('');
  lines.push('core');
  lines.push('----');
  lines.push(...exercisesToTreeLines(coreExercises));
  lines.push('');

  lines.push('bonus');
  lines.push('-----');
  lines.push('');
  lines.push(...exercisesToTreeLines(bonusExercises));
  lines.push('');
  return lines.join(EOL);
}
