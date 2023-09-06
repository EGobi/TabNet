// requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Atendimentos&"
// requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Valor_total&"
// requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Valor_m%E9dio&"
// requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Valor_cobrado&"
// requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Valor_pago&"
// requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Quantidade_cobrada&"
// requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Quantidade_paga&"
// requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=Dias_de_perman%EAncia_AIH&"
requestBodyStart = "Linha=Ano&Coluna=--N%E3o-Ativa--&Incremento=M%E9dia_de_perman%EAncia_AIH&"
requestBodyEnd = "&formato=table&mostre=Mostra"

csvLine = `data:text/csv;charset=utf-8,Ano;Estado;Tipo de atendimento;Sexo;Tipo de contratação;Abrangência geográfica;Segmentação por grupo;Quantidade`
csvLineExportStep1 = `data:text/csv;charset=utf-8,Ano;Estado;Tipo de atendimento;Sexo;Tipo de contratação;Abrangência geográfica;Quantidade\r\n`;

url = `https://www.ans.gov.br/anstabnet/cgi-bin/tabnet?dados/tabnet_res.def`

anos = [/*"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", */"22"]

SUF = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
UF  = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "RO", "EX", "NI"]

STipo_de_atendimento = [1, 2]
Tipo_de_atendimento = ["AIH", "APAC"]

SSexo = [1, 2, 3]
Sexo = ["Masculino", "Feminino", "Não informado"]

STipo_de_contratacao = [1, 2, 3, 4, 5] // STipo_de_contrata%E7%E3o
Tipo_de_contratacao = ["Individual ou Familiar", "Coletivo Empresarial", "Coletivo por adesão", "Coletivo não identificado", "Não Informado"]

SAbrangencia_geog = [1, 2, 3, 4, 5, 6, 7] // SAbrang%EAncia_geog.
Abrangencia_geog = ["Nacional", "Grupo de Estados", "Estadual", "Grupo de Municípios", "Municipal", "Outra", "Não Informado"]

function check(body) {
    var xhr = new XMLHttpRequest();
    var parser = new DOMParser();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {

        } else if (xhr.readyState == 4) {
            console.log("HTTP returned error code", xhr.status)
        }
    }

    parameters = `${requestBodyStart}${body}${requestBodyEnd}`

    xhr.open("POST", url, false);
    xhr.send(parameters);

    tab = parser.parseFromString(xhr.response, "text/html")

    if (tab.querySelector("h2").innerText == "Nenhum registro selecionado") {
        return {checkString: "no"}
    } else if (tab.querySelector("h2").innerText == "Atendimentos de beneficiários no SUS") {
        return {checkString: "yes", quantidade: tab.querySelectorAll("td")[0].innerText} //no browser, precisar mudar para ("td")[8]
    } else {
        return {checkString: "what?"}
    }
}
//`data:text/csv;charset=utf-8,Ano;Estado;Tipo de atendimento;Sexo;Tipo de contratação;Abrangência geográfica;Quantidade\r\n`;
function exportStep1(ano, estado, atendimento, sexo, contratacao, abrangencia, quantidade) {
    csvLineExportStep1 += `${ano};${estado};${atendimento};${sexo};${contratacao};${abrangencia};${quantidade}`
}

function main() {
    for (a in anos) {
        ano = anos[a]
        arquivoArg = `Arquivos=tb_res_${ano}.dbf`
        
        for (u in UF) {
            estado = SUF[u]
            if (check(`${arquivoArg}&SUF=${SUF[u]}`).checkString == "no") {
                console.log("Pulando", UF[u])
                continue
            }

            for (tA in Tipo_de_atendimento) {
                atendimento = STipo_de_atendimento[tA]
                if (check(`${arquivoArg}&SUF=${SUF[u]}&STipo_de_atendimento=${STipo_de_atendimento[tA]}`).checkString == "no") {
                    console.log("Pulando", Tipo_de_atendimento[tA])
                    continue
                }

                for (s in Sexo) {
                    sexo = SSexo[s]
                    if (check(`${arquivoArg}&SUF=${SUF[u]}&STipo_de_atendimento=${STipo_de_atendimento[tA]}\
&SSexo=${SSexo[s]}`).checkString == "no") {
                        console.log("Pulando", Sexo[s])
                        continue
                    }

                    for (tC in Tipo_de_contratacao) {
                        contratacao = STipo_de_contratacao[tC]
                        if (check(`${arquivoArg}&SUF=${SUF[u]}&STipo_de_atendimento=${STipo_de_atendimento[tA]}\
&SSexo=${SSexo[s]}&STipo_de_contrata%E7%E3o=${STipo_de_contratacao[tC]}`).checkString == "no") {
                            console.log("Pulando", Tipo_de_contratacao[tC])
                            continue
                        }

                        for (aG in Abrangencia_geog) {
                            abrangencia = SAbrangencia_geog[aG]
                            c = check(`${arquivoArg}&SUF=${SUF[u]}&STipo_de_atendimento=${STipo_de_atendimento[tA]}&SSexo=${SSexo[s]}&STipo_de_contrata%E7%E3o=${STipo_de_contratacao[tC]}&SAbrang%EAncia_geog.=${SAbrangencia_geog[aG]}`)
                            if (c.checkString == "no") {
                                console.log("Pulando", Abrangencia_geog[aG])
                                continue
                            }

                            // aqui, podemos reunir todos os resultados e exportar para uma tabela

                            exportStep1(ano, estado, atendimento, sexo, contratacao, abrangencia, c.quantidade)
/*
                            for (sG in Segmentacao_grupo) {
                                segmentacao = SSegmentacao_grupo[sG]
                                if (check(`${arquivoArg}&SUF=${SUF[u]}&STipo_de_atendimento=${STipo_de_atendimento[tA]}\
&SSexo=${SSexo[s]}&STipo_de_contrata%E7%E3o=${STipo_de_contratacao[tC]}&SAbrang%EAncia_geog.=${SAbrangencia_geog[aG]}\
&SSegmenta%E7%E3o_grupo=${SSegmentacao_grupo[sG]}`).checkString == "no") {
                                    console.log("Pulando", Segmentacao_grupo[sG])
                                    continue
                                }
                            }
                            */
                        }
                    }
                }
            }
        }
    }

    window.open(encodeURI(csvLineExportStep1))
}


/*
    parameters = requestBodyStart + arquivoArg + requestBodyEnd

                console.log(u, t)
                //loadTab(url, parameters);
                //getValues();
                */