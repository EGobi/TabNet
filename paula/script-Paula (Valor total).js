// a linha deve corresponder à coluna que queremos extrair, e o incremento ao valor
requestBodyStart = "Linha=Modalidade&Coluna=--N%E3o-Ativa--&Incremento=Valor_total&"
//requestBodyStart = "Linha=Modalidade&Coluna=--N%E3o-Ativa--&Incremento=Valor_total&"

requestBodyEnd = "&formato=table&mostre=Mostra"

csvLine = `data:text/csv;charset=utf-8,Ano;Estado;Tipo de atendimento;Sexo;Tipo de contratação;Abrangência geográfica;Segmentação por grupo;Faixa etária;Capítulo CID-10;Modalidade;Quantidade\r\n`

url = `https://www.ans.gov.br/anstabnet/cgi-bin/tabnet?dados/tabnet_res.def`

Segmentacao_grupo = {
    "Ambulatorial": 1,
    "Hospitalar": 2,
    "Hospitalar e Ambulatorial": 3,
    "Referência": 4,
    "Odontológico": 5,
    "Informado incorretamente": 6,
    "Não Informado": 7
} // SSegmenta%E7%E3o_grupo

Modalidade = {
    "Autogestão": 1,
    "Cooperativa Médica": 2,
    "Filantropia": 3,
    "Medicina de Grupo": 4,
    "Seguradora Especializada em Saúde": 5,
    "Cooperativa Odontológica": 6,
    "Odontologia de Grupo": 7,
    "Administradora": 8,
    "Administradora de Benefícios": 9
}

Faixa_etaria = {
    "Até 1 ano": 1,
    "1 a 4 anos": 2,
    "5 a 9 anos": 3,
    "10 a 14 anos": 4,
    "15 a 19 anos": 5,
    "20 a 24 anos": 6,
    "25 a 29 anos": 7,
    "30 a 34 anos": 8,
    "35 a 39 anos": 9,
    "40 a 44 anos": 10, 
    "45 a 49 anos": 11,
    "50 a 54 anos": 12, 
    "55 a 59 anos": 13, 
    "60 a 64 anos": 14, 
    "65 a 69 anos": 15, 
    "70 a 74 anos": 16, 
    "75 a 79 anos": 17, 
    "80 anos ou mais": 18, 
    "Inconsistente": 19
} // SFaixa_et%E1ria

Especialidade_AIH = {
    "Cirurgia": 1, 
    "Obstetrícia": 2, 
    "Clínica Médica": 3, 
    "Pacientes sob cuidados prolongado": 4, 
    "Psiquiatria": 5, 
    "Tisiologia": 6, 
    "Pediatria": 7, 
    "Reabilitação": 8, 
    "Psiquiatria em hospital dia": 9, 
    "Não informado": 10
}

SCapitulo_CID10 = "" // SCap%EDtulo_CID-10
Capitulo_CID10 = {
    "I.   Algumas doenças infecciosas e parasitárias": 1, 
    "II.  Neoplasias (tumores)": 2,
    "III. Doenças sangue órgãos hemat e transt imunitár": 3, 
    "IV.  Doenças endócrinas nutricionais e metabólicas": 4, 
    "V.   Transtornos mentais e comportamentais": 5, 
    "VI.  Doenças do sistema nervoso": 6, 
    "VII. Doenças do olho e anexos": 7, 
    "VIII.Doenças do ouvido e da apófise mastóide": 8, 
    "IX.  Doenças do aparelho circulatório": 9, 
    "X.   Doenças do aparelho respiratório": 10, 
    "XI.  Doenças do aparelho digestivo": 11, 
    "XII. Doenças da pele e do tecido subcutâneo": 12, 
    "XIII.Doenças sist osteomuscular e tec conjuntivo": 13,
    "XIV. Doenças do aparelho geniturinário": 14, 
    "XV.  Gravidez parto e puerpério": 15, 
    "XVI. Algumas afec originadas no período perinatal": 16,
    "XVII.Malf cong deformid e anomalias cromossômicas": 17, 
    "XVIII.Sint sinais e achad anorm ex clín e laborat": 18,
    "XIX. Lesões enven e alg out conseq causas externas": 19, 
    "XX.  Causas externas de morbidade e mortalidade": 20,
    "XXI. Contatos com serviços de saúde": 21, 
    "XXII.Códigos para propósitos especiais": 22, 
    "U99  CID 10ª Revisão não disponível": 23,
    "Ignorado": 24, 
    "Não informado": 25
}


function main() {
    for (i in jsonFile) {
        ano    = jsonFile[i]["1"]
        ano    = ano.toString().length == 2 ? ano : "0" + ano
        estado = jsonFile[i]["2"]
        tp_atd = jsonFile[i]["3"]
        sexo   = jsonFile[i]["4"]
        tp_cnt = jsonFile[i]["5"]
        abrngc = jsonFile[i]["6"]
        segmnt = jsonFile[i]["7"]
        faixae = jsonFile[i]["8"]
        capcid = jsonFile[i]["9"]
        // adicionar conforme disponibilidade no arquivo de entrada
        modali = jsonFile[i]["10"]

        console.log(ano, estado, tp_atd, sexo, tp_cnt, abrngc, segmnt, faixae, capcid
            // adicionar conforme disponibilidade no arq. de entr.
            , modali)

        var xhr = new XMLHttpRequest();
        var parser = new DOMParser();

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {

            } else if (xhr.readyState == 4) {
                console.log("HTTP returned error code", xhr.status)
            }
        }

        //adicionar conforme disponibilidade no arq. de entrada
        body = `Arquivos=tb_res_${ano}.dbf&SUF=${estado}&STipo_de_atendimento=${tp_atd}&SSexo=${sexo}&STipo_de_contrata%E7%E3o=${tp_cnt}&SAbrang%EAncia_geog.=${abrngc}&SSegmenta%E7%E3o_grupo=${segmnt}&SFaixa_et%E1ria=${faixae}&SCap%EDtulo_CID-10=${capcid}&SModalidade=${modali}`
        parameters = `${requestBodyStart}${body}${requestBodyEnd}`

        xhr.open("POST", url, false);
        xhr.send(parameters);

        tab = parser.parseFromString(xhr.response, "text/html")

        linhas = tab.querySelectorAll("tr").length - 3

        if (linhas < 1) {
            linhas = 1
        }

        console.log(linhas)

        for (j = 2; j < 2 + linhas; j++) {
            /* *** PARA O RESTANTE *** */
            header = tab.querySelectorAll("tr")[j].children[0].innerText.trim()
            // adicionar a coluna que queremos extrair
            modali = Modalidade[header]
            /* */
            /* *** PARA MUNICÍPIO *** */
            //munici = tab.querySelectorAll("tr")[j].children[0].innerText.replace(/\D/g,"")
            /* */

            quantidade = tab.querySelectorAll("tr")[j].children[1].innerText
            // adicionar a coluna que queremos extrair
            csvLine += `${ano};${estado};${tp_atd};${sexo};${tp_cnt};${abrngc};${segmnt};${faixae};${capcid};${modali};${quantidade}`
        }

        console.log(`Fim da linha ${i}`)
    }
}