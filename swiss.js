// Swiss tournament pairing and ranking logic

export function generateRoundPairs(movies) {
  const sorted = [...movies].sort((a, b) =>
    b.score !== a.score ? b.score - a.score :
    b.buchholz !== a.buchholz ? b.buchholz - a.buchholz :
    a.id.localeCompare(b.id)
  );

  const pairs = [];
  const used = new Set();

  for (let i = 0; i < sorted.length; i++) {
    if (used.has(sorted[i].id)) continue;
    let matched = false;
    for (let j = i + 1; j < sorted.length; j++) {
      if (used.has(sorted[j].id)) continue;
      if (!sorted[i].opponents.includes(sorted[j].id)) {
        pairs.push({ a: sorted[i].id, b: sorted[j].id, completed: false, result: null });
        used.add(sorted[i].id);
        used.add(sorted[j].id);
        matched = true;
        break;
      }
    }
    if (!matched) {
      for (let j = i + 1; j < sorted.length; j++) {
        if (!used.has(sorted[j].id)) {
          pairs.push({ a: sorted[i].id, b: sorted[j].id, completed: false, result: null });
          used.add(sorted[i].id);
          used.add(sorted[j].id);
          break;
        }
      }
    }
  }

  const byeId = sorted.find(m => !used.has(m.id))?.id ?? null;
  return { pairs, byeId };
}

export function getRankings(movies) {
  return [...movies]
    .sort((a, b) =>
      b.score !== a.score ? b.score - a.score :
      b.buchholz !== a.buchholz ? b.buchholz - a.buchholz :
      a.name.localeCompare(b.name)
    )
    .map((m, i) => ({ ...m, rank: i + 1 }));
}
