requestBody = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Atendimentos&Arquivos=tb_res_22.dbf&STipo_de_atendimento=1&SSexo=TODAS_AS_CATEGORIAS__&SFaixa_et%E1ria=TODAS_AS_CATEGORIAS__&STipo_de_contrata%E7%E3o=5&S%C9poca_do_contrato=TODAS_AS_CATEGORIAS__&SSegmenta%E7%E3o_grupo=TODAS_AS_CATEGORIAS__&SAbrang%EAncia_geog.=TODAS_AS_CATEGORIAS__&SModalidade=TODAS_AS_CATEGORIAS__&SEspecialidade_AIH=TODAS_AS_CATEGORIAS__&SCap%EDtulo_CID-10=TODAS_AS_CATEGORIAS__&SLista_morbidades_CID-10=TODAS_AS_CATEGORIAS__&SProcedimento_at%E9_2007=TODAS_AS_CATEGORIAS__&SProcedimento_ap%F3s_2007=TODAS_AS_CATEGORIAS__&SPrestador_%28De_A_at%E9_H%29=TODAS_AS_CATEGORIAS__&SPrestador_%28De_I_at%E9_Z%29=TODAS_AS_CATEGORIAS__&SEsfera_administrativa=TODAS_AS_CATEGORIAS__&SUF=TODAS_AS_CATEGORIAS__&SRegi%E3o=TODAS_AS_CATEGORIAS__&SMunic%EDpio=TODAS_AS_CATEGORIAS__&formato=table&mostre=Mostra"

csvLine = `data:text/csv;charset=utf-8,Ano;Estado;Tipo de atendimento;Sexo;Tipo de contratação;Abrangência geográfica;Segmentação por grupo;Quantidade`

url = `https://www.ans.gov.br/anstabnet/cgi-bin/tabnet?dados/tabnet_res.def`

anos = [/*"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", */"22"]

SUF = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
UF  = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PB", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "RO", "EX", "NI"]

STipo_de_atendimento = [1, 2]
Tipo_de_atendimento = ["AIH", "APAC"]

SSexo = [1, 2, 3]
Sexo = ["Masculino", "Feminino", "Não informado"]

STipo_de_contratacao = [1, 2, 3, 4, 5] // STipo_de_contrata%E7%E3o
Tipo_de_contratacao = ["Individual ou Familiar", "Coletivo Empresarial", "Coletivo por adesão", "Coletivo não identificado", "Não Informado"]

SAbrangencia_geog = [1, 2] // SAbrang%EAncia_geog.
Abrangencia_geog = ["Nacional", "Grupo de Estados"]