export function analyzer(analysis) {
  function getAtTime(set, time) {
    for (let i = 0; i < set.length; i++) {
        if (time < set[i].start) {
            return set[i - 1];
        }
    }
  }

  function resolve(atTime) {
    return {
        bar: getAtTime(analysis.bars, atTime),
        section: getAtTime(analysis.sections, atTime),
        segment: getAtTime(analysis.segments, atTime),
        tatum: getAtTime(analysis.tatums, atTime),
    };
  }

  return {
    resolve,
  }
}

