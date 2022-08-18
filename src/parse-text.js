function possessiveName(name) {
  if (!name) return "";
  if (name[name.length] === "s") name = name + "'";
  else name = name + "'s";
  return name;
}

function genderPossessive(gender) {
  switch (gender) {
    case "he":
      return "his";
    case "she":
      return "her";
    case "they":
      return "their";
    case "ve":
      return "vis";
    case "ze":
      return "hir";
    default:
      return "his";
  }
}

function genderObject(gender) {
  switch (gender) {
    case "he":
      return "him";
    case "she":
      return "her";
    case "they":
      return "them";
    case "ve":
      return "ver";
    case "ze":
      return "hir";
    default:
      return "him";
  }
}

function genderSubject(gender) {
  switch (gender) {
    case "he":
      return "he";
    case "she":
      return "she";
    case "they":
      return "they";
    case "ve":
      return "ve";
    case "ze":
      return "ze";
    default:
      return "he";
  }
}

function genderPossessivePronoun(gender) {
  switch (gender) {
    case "he":
      return "his";
    case "she":
      return "hers";
    case "they":
      return "theirs";
    case "ve":
      return "vis";
    case "ze":
      return "hirs";
    default:
      return "his";
  }
}

function genderReflexive(gender) {
  switch (gender) {
    case "he":
      return "himself";
    case "she":
      return "herself";
    case "they":
      return "themself";
    case "ve":
      return "verself";
    case "ze":
      return "hirself";
    default:
      return "himself";
  }
}

export function parseText(actorState, subjectState, message) {
  const matchText = {
    "%a%": actorState.name,
    "%as%": possessiveName(actorState.name),
    "%a-he%": genderSubject(actorState.gender),
    "%a-him%": genderObject(actorState.gender),
    "%a-his%": genderPossessive(actorState.gender),
    "%a-hers%": genderPossessivePronoun(actorState.gender),
    "%a-himself%": genderReflexive(actorState.gender),
    "%a-obj%": actorState.object,
    "%s%": subjectState.name,
    "%ss%": possessiveName(subjectState.name),
    "%s-he%": genderSubject(subjectState.gender),
    "%s-him%": genderObject(subjectState.gender),
    "%s-his%": genderPossessive(subjectState.gender),
    "%s-hers%": genderPossessivePronoun(subjectState.gender),
    "%s-himself%": genderReflexive(subjectState.gender),
    "%s-obj%": subjectState.object,
  };
  let re = new RegExp(Object.keys(matchText).join("|"), "g");

  message = message.replace(re, (match) => matchText[match]);
  return message[0].toUpperCase() + message.substring(1);
}
