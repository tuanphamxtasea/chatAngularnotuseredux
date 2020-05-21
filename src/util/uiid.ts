export function uiid():string
{
  var d = new Date();
  var n = d.getTime();
  return n.toString();
}
