export async function onRequestGet(context) {
  const db = context.env.DB;
  const idUsuario = context.request.url.searchParams.get("id");
  
  // VULNERABILIDADE: SQL montado por concatenação em vez de bind()
  const query = "SELECT * FROM notas WHERE aluno_id = " + idUsuario;
  const resultado = await db.prepare(query).all();
  
  return Response.json(resultado);
}
