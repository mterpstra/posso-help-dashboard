export const DeathCauseDropdown = () => {
  return (
    <select name="cause">
      <option value="aborto">Aborto</option>
      <option value="morreu">Morreu</option>
      <option value="morto">Morto</option>
      <option value="nasceu-morto">Nasceu Morto</option>
      <option value="natimorto">Natimorto</option>
      <option value="natimortos">Natimortos</option>
      <option value="other">Other</option>
    </select>
  );
}
export default DeathCauseDropdown;
