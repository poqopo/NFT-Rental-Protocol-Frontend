export async function daytoblock(day) {
  return day * 60 * 60 * 24;
}

export async function blocktoday(block) {
  return block / 60 / 60 / 24;
}