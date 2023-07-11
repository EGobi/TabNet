requestBody = "Linha=Munic%EDpio&Coluna=--N%E3o-Ativa--&Incremento=Qtd.aprovada&pesqmes1=Digite+o+texto+e+ache+f%E1cil&SMunic%EDpio=TODAS_AS_CATEGORIAS__&SRegi%E3o_de_Sa%FAde_%28CIR%29=TODAS_AS_CATEGORIAS__&SMacrorregi%E3o_de_Sa%FAde=TODAS_AS_CATEGORIAS__&SDivis%E3o_administ_estadual=TODAS_AS_CATEGORIAS__&SMicrorregi%E3o_IBGE=TODAS_AS_CATEGORIAS__&SRegi%E3o_Metropolitana_-_RIDE=TODAS_AS_CATEGORIAS__&pesqmes7=Digite+o+texto+e+ache+f%E1cil&SProcedimento=3&SGrupo_procedimento=TODAS_AS_CATEGORIAS__&pesqmes9=Digite+o+texto+e+ache+f%E1cil&SSubgrupo_proced.=TODAS_AS_CATEGORIAS__&pesqmes10=Digite+o+texto+e+ache+f%E1cil&SForma_organiza%E7%E3o=TODAS_AS_CATEGORIAS__&SComplexidade=1&SFinanciamento=TODAS_AS_CATEGORIAS__&pesqmes13=Digite+o+texto+e+ache+f%E1cil&SRubrica_FAEC=TODAS_AS_CATEGORIAS__&pesqmes14=Digite+o+texto+e+ache+f%E1cil&SRegra_contratual=TODAS_AS_CATEGORIAS__&SCar%E1ter_Atendiment=TODAS_AS_CATEGORIAS__&SGest%E3o=TODAS_AS_CATEGORIAS__&SDocumento_registro=TODAS_AS_CATEGORIAS__&SEsfera_administrat=TODAS_AS_CATEGORIAS__&STipo_de_prestador=TODAS_AS_CATEGORIAS__&pesqmes20=Digite+o+texto+e+ache+f%E1cil&SNatureza_Jur%EDdica=TODAS_AS_CATEGORIAS__&pesqmes21=Digite+o+texto+e+ache+f%E1cil&SEsfera_Jur%EDdica=TODAS_AS_CATEGORIAS__&SAprova%E7%E3o_produ%E7%E3o=TODAS_AS_CATEGORIAS__&pesqmes23=Digite+o+texto+e+ache+f%E1cil&SProfissional_-_CBO=531&formato=table&mostre=Mostra"

csvLine = `data:text/csv;charset=utf-8,Mês;Estado;Município;Quantidade aprovada\r\n`;

arquivoArg = "&Arquivos=qaac0801.dbf"

url = "http://tabnet.datasus.gov.br/cgi/deftohtm.exe?sia/cnv/qa" //qaac.def

anos  = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
meses = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
estados = ["ac", "al", "am", "ap", "ba", "ce", "df", "es", "go", "ma", "mt", "ms", "mg", "pa", "pb", "pr", "pe", "pi", "rj", "rn", "rs", "ro", "rs", "sc", "sp", "se", "to"]