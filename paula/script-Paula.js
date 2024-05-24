// a linha deve corresponder à coluna que queremos extrair, e o incremento ao valor
/*
linha = 'UF'
linha = 'Tipo_de_atendimento'
linha = 'Sexo'
linha = 'Tipo_de_contrata%E7%E3o'
linha = 'Abrang%EAncia_geog.'
linha = 'Segmenta%E7%E3o_grupo'
linha = 'Faixa_et%E1ria'
linha = 'Cap%EDtulo_CID-10'
linha = 'Modalidade'
*/
const linha = 'Modalidade'

// Atendimentos, Valor_total, Valor_m%E9dio, Valor_cobrado, Valor_pago, Quantidade_cobrada, Quantidade_paga
const incremento = 'Valor_cobrado'

const requestBodyStart = `Linha=${linha}&Coluna=--N%E3o-Ativa--&Incremento=${incremento}&`
const requestBodyEnd = '&formato=table&mostre=Mostra'

//  csvLine = `data:text/csv;charset=utf-8,Ano;Estado;Tipo de atendimento;Sexo;Tipo de contratação;Abrangência geográfica;Segmentação por grupo;Faixa etária;Capítulo CID-10;Modalidade;Atendimentos\r\n`
let csvLine = 'data:text/csv;charset=utf-8,Ano;Estado;Tipo de atendimento;Sexo;Tipo de contratação;Abrangência geográfica;Segmentação por grupo;Faixa etária;Capítulo CID-10;Modalidade;Valor cobrado\r\n'
const url = 'https://www.ans.gov.br/anstabnet/cgi-bin/tabnet?dados/tabnet_res.def'
/*
const UF = {
  Acre: 1,
  Alagoas: 2,
  Amapá: 3,
  Amazonas: 4,
  Bahia: 5,
  Ceará: 6,
  'Distrito Federal': 7,
  'Espírito Santo': 8,
  Goiás: 9,
  Maranhão: 10,
  'Mato Grosso': 11,
  'Mato Grosso do Sul': 12,
  'Minas Gerais': 13,
  Pará: 14,
  Paraíba: 15,
  Paraná: 16,
  Pernambuco: 17,
  Piauí: 18,
  'Rio de Janeiro': 19,
  'Rio Grande do Norte': 20,
  'Rio Grande do Sul': 21,
  Rondônia: 22,
  Roraima: 23,
  'Santa Catarina': 24,
  'São Paulo': 25,
  Sergipe: 26,
  Tocantins: 27,
  Exterior: 28,
  'Não Identificado': 29
}

const tipoAtendimento = {
  AIH: 1,
  APAC: 2
} // STipo_de_atendimento

const sexoCl = {
  Masculino: 1,
  Feminino: 2,
  'Não informado': 3
} // SSexo

const tipoContratacao = {
  'Individual ou Familiar': 1,
  'Coletivo Empresarial': 2,
  'Coletivo por adesão': 3,
  'Coletivo não identificado': 4,
  'Não Informado': 5
} // STipo_de_contrata%E7%E3o

const abrangenciaGeografica = {
  Nacional: 1,
  'Grupo de Estados': 2,
  Estadual: 3,
  'Grupo de Municípios': 4,
  Municipal: 5,
  Outra: 6,
  'Não Informado': 7
} // SAbrang%EAncia_geog.

const segmentacaoGrupo = {
  Ambulatorial: 1,
  Hospitalar: 2,
  'Hospitalar e Ambulatorial': 3,
  Referência: 4,
  Odontológico: 5,
  'Informado incorretamente': 6,
  'Não Informado': 7
} // SSegmenta%E7%E3o_grupo

const faixaEtaria = {
    'Até 1 ano': 1,
    '1 a 4 anos': 2,
    '5 a 9 anos': 3,
    '10 a 14 anos': 4,
    '15 a 19 anos': 5,
    '20 a 24 anos': 6,
    '25 a 29 anos': 7,
    '30 a 34 anos': 8,
    '35 a 39 anos': 9,
    '40 a 44 anos': 10,
    '45 a 49 anos': 11,
    '50 a 54 anos': 12,
    '55 a 59 anos': 13,
    '60 a 64 anos': 14,
    '65 a 69 anos': 15,
    '70 a 74 anos': 16,
    '75 a 79 anos': 17,
    '80 anos ou mais': 18,
    Inconsistente: 19
} // SFaixa_et%E1ria

const sCapituloCID10 = '' // SCap%EDtulo_CID-10
const capituloCID10 = {
  'I.   Algumas doenças infecciosas e parasitárias': 1,
  'II.  Neoplasias (tumores)': 2,
  'III. Doenças sangue órgãos hemat e transt imunitár': 3,
  'IV.  Doenças endócrinas nutricionais e metabólicas': 4,
  'V.   Transtornos mentais e comportamentais': 5,
  'VI.  Doenças do sistema nervoso': 6,
  'VII. Doenças do olho e anexos': 7,
  'VIII.Doenças do ouvido e da apófise mastóide': 8,
  'IX.  Doenças do aparelho circulatório': 9,
  'X.   Doenças do aparelho respiratório': 10,
  'XI.  Doenças do aparelho digestivo': 11,
  'XII. Doenças da pele e do tecido subcutâneo': 12,
  'XIII.Doenças sist osteomuscular e tec conjuntivo': 13,
  'XIV. Doenças do aparelho geniturinário': 14,
  'XV.  Gravidez parto e puerpério': 15,
  'XVI. Algumas afec originadas no período perinatal': 16,
  'XVII.Malf cong deformid e anomalias cromossômicas': 17,
  'XVIII.Sint sinais e achad anorm ex clín e laborat': 18,
  'XIX. Lesões enven e alg out conseq causas externas': 19,
  'XX.  Causas externas de morbidade e mortalidade': 20,
  'XXI. Contatos com serviços de saúde': 21,
  'XXII.Códigos para propósitos especiais': 22,
  'U99  CID 10ª Revisão não disponível': 23,
  Ignorado: 24,
  'Não informado': 25
}

const especialidadeAIH = {
  Cirurgia: 1,
  Obstetrícia: 2,
  'Clínica Médica': 3,
  'Pacientes sob cuidados prolongado': 4,
  Psiquiatria: 5,
  Tisiologia: 6,
  Pediatria: 7,
  Reabilitação: 8,
  'Psiquiatria em hospital dia': 9,
  'Não informado': 10
}

const modalidade = {
  Autogestão: 1,
  'Cooperativa Médica': 2,
  Filantropia: 3,
  'Medicina de Grupo': 4,
  'Seguradora Especializada em Saúde': 5,
  'Cooperativa Odontológica': 6,
  'Odontologia de Grupo': 7,
  Administradora: 8,
  'Administradora de Benefícios': 9
}
*/

const modalidade = {
  Autogestão: 1,
  'Cooperativa Médica': 2,
  Filantropia: 3,
  'Medicina de Grupo': 4,
  'Seguradora Especializada em Saúde': 5,
  'Cooperativa Odontológica': 6,
  'Odontologia de Grupo': 7,
  Administradora: 8,
  'Administradora de Benefícios': 9
}

function main () {
  for (const i in jsonFile) {
    let ano = jsonFile[i]['1']
    ano = ano.toString().length === 2 ? ano : '0' + ano
    const estado = jsonFile[i]['2']
    const tpAtd = jsonFile[i]['3']
    const sexo = jsonFile[i]['4']
    const tpCnt = jsonFile[i]['5']
    const abrngc = jsonFile[i]['6']
    const segmnt = jsonFile[i]['7']
    const faixae = jsonFile[i]['8']
    const capcid = jsonFile[i]['9']
    // modali = jsonFile[i]['10']
    // adicionar conforme disponibilidade no arquivo de entrada

    console.log(ano, estado, tpAtd, sexo, tpCnt, abrngc, segmnt, faixae, capcid)
    //               estado, tpAtd, sexo, tpCnt, abrngc, segmnt, faixae, capcid, modali
    // adicionar conforme disponibilidade no arq. de entr.

    const xhr = new XMLHttpRequest()
    const parser = new DOMParser()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // do nothing
      } else if (xhr.readyState === 4) {
        console.log('HTTP returned error code', xhr.status)
      }
    }

    // adicionar conforme disponibilidade no arq. de entrada
    const body = `Arquivos=tb_res_${ano}.dbf&SUF=${estado}&STipo_de_atendimento=${tpAtd}&SSexo=${sexo}&STipo_de_contrata%E7%E3o=${tpCnt}&SAbrang%EAncia_geog.=${abrngc}&SSegmenta%E7%E3o_grupo=${segmnt}&SFaixa_et%E1ria=${faixae}&SCap%EDtulo_CID-10=${capcid}`
    //                                      &SUF=${estado}&STipo_de_atendimento=${tpAtd}&SSexo=${sexo}&STipo_de_contrata%E7%E3o=${tpCnt}&SAbrang%EAncia_geog.=${abrngc}&SSegmenta%E7%E3o_grupo=${segmnt}&SFaixa_et%E1ria=${faixae}&SCap%EDtulo_CID-10=${capcid}&SModalidade=${modali}`
    const parameters = `${requestBodyStart}${body}${requestBodyEnd}`

    xhr.open('POST', url, false)
    xhr.send(parameters)

    const tab = parser.parseFromString(xhr.response, 'text/html')

    if (tab.body.children[2].innerText === 'Nenhum registro selecionado') {
      if (typeof modali === 'undefined') {
        modali = 1
      } // quickfix para valor cobrado em que a primeira linha do arquivo retorna 0
      const quantidade = '0\n'
      csvLine += `${ano};${estado};${tpAtd};${sexo};${tpCnt};${abrngc};${segmnt};${faixae};${capcid};${quantidade}`
    } else {
      let linhas = tab.querySelectorAll('tr').length - 3

      if (linhas < 1) {
        linhas = 1
      }

      for (let j = 2; j < 2 + linhas; j++) {
        /* *** PARA O RESTANTE *** */
        const header = tab.querySelectorAll('tr')[j].children[0].innerText.trim()
        // adicionar a coluna que queremos extrair
        // estado = UF[header]
        // tpAtd = tipoAtendimento[header]
        // sexo = sexoCl[header]
        // tpCnt = tipoContratacao[header]
        // abrngc = abrangenciaGeografica[header]
        // segmnt = segmentacaoGrupo[header]
        // faixae = faixaEtaria[header]
        // capcid = capituloCID10[header]
        modali = modalidade[header]
        /* */
        /* *** PARA MUNICÍPIO *** */
        // munici = tab.querySelectorAll("tr")[j].children[0].innerText.replace(/\D/g,"")
        /* */

        const quantidade = tab.querySelectorAll('tr')[j].children[1].innerText
        // adicionar a coluna que queremos extrair
        csvLine += `${ano};${estado};${tpAtd};${sexo};${tpCnt};${abrngc};${segmnt};${faixae};${capcid};${modali};${quantidade}`
        //                ;${estado};${tpAtd};${sexo};${tpCnt};${abrngc};${segmnt};${faixae};${capcid};${modali};${quantidade}`
      }
    }

    console.log(`Fim da linha ${i}`)
  }
}
