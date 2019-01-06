<template>
<table>
  <tr>
    <th>Device </th>
    <th>Latitude</th>
    <th>Longitude</th>
  </tr>
  <tr>
    <td>1</td>
    <td>44.482948</td>
    <td>-103.850380</td>
  </tr>
  <tr>
    <td>2</td>
    <td>44.080544</td>
    <td>-103.231018</td>
  </tr>
</table>
</template>

<script>
  export default {
  name: 'Dashboard',
  }
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>