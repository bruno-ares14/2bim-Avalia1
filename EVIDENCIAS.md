# Evidências da Avaliação - 2º Bimestre

## Links e Evidências Técnicas

(evidencia de execução verde)
https://github.com/bruno-ares14/2bim-Avalia1/actions/runs/38597405367

(erro forçado do SQL)
https://github.com/bruno-ares14/2bim-Avalia1/actions/runs/38597925922/job/115969344884

Run for f in migrations/*.sql; do sqlite3 teste.db < "$f"; done
Parse error near line 1: near "CRIAR": syntax error
  CRIAR TABELA IF NOT EXISTS notas (   id INTEGER PRIMARY KEY AUTOINCREMENT,   a
  ^--- error here
Error: Process completed with exit code 1.

(evidencia PR bloqueado)
https://github.com/bruno-ares14/2bim-Avalia1/pull/1

(Saída do git push recusado na main)
@bruno-ares14 ➜ /workspaces/2bim-Avalia1 (main) $ echo "teste2" > teste2.txt
@bruno-ares14 ➜ /workspaces/2bim-Avalia1 (main) $ git add .
@bruno-ares14 ➜ /workspaces/2bim-Avalia1 (main) $ git commit -m "Teste bloqueio real"
[main cfde33f] Teste bloqueio real
 1 file changed, 1 insertion(+)
 create mode 100644 teste2.txt
@bruno-ares14 ➜ /workspaces/2bim-Avalia1 (main) $ git push origin main
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 2 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 289 bytes | 289.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
remote: error: GH006: Protected branch update failed for refs/heads/main.
remote:
remote: - Changes must be made through a pull request.
remote:
remote: - Required status check "verificar" is expected.
To https://github.com/bruno-ares14/2bim-Avalia1
 ! [remote rejected] main -> main (protected branch hook declined)
error: failed to push some refs to 'https://github.com/bruno-ares14/2bim-Avalia1'
