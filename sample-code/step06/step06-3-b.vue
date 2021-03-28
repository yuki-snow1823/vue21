<style module lang="scss">
.input-container {
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    'inputArea previewArea'
    'buttonArea buttonArea';
  grid-template-columns: 300px 300px;
  grid-template-rows: 200px 50px;
}
.inputArea {
  display: grid;
  grid-area: inputArea;
}
.previewArea {
  display: grid;
  grid-area: previewArea;
}
.buttonArea {
  align-items: center;
  display: grid;
  grid-area: buttonArea;
  justify-items: center;
}
.filterArea {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 300px 300px;
}
table {
  border-collapse: collapse;
  margin-top: 10px;
  width: 610px;
}
th,
td {
  padding-left: 5px;
  width: 50%;
  word-break: break-all;
}
td input {
  width: 95%;
}
.buttonWrapper {
  align-items: center;
  display: grid;
  height: 50px;
  justify-content: center;
  width: 610px;
}
</style>
