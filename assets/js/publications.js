function getRecentPubs()
{
    //
    $.get('https://inspirehep.net/api/literature?sort=mostrecent&size=10&q=find a John C Groh', function(data) {
        for (jrecord = 0; jrecord < data.hits.hits.length; jrecord++) {
            var title = data.hits.hits[jrecord].metadata.titles[0].title;
            var arxiv_text = 'arxiv:' + data.hits.hits[jrecord].metadata.arxiv_eprints[0].value;
            var arxiv_link = 'https://arxiv.org/abs/' + data.hits.hits[jrecord].metadata.arxiv_eprints[0].value;
            try {
                if (data.hits.hits[jrecord].metadata.hasOwnProperty('publication_info')) {
                    var journal_name = data.hits.hits[jrecord].metadata.publication_info[0].journal_title;
                    journal_name = journal_name.replace(/\./g, '. ');
                    if (journal_name.substr(journal_name.length - 1) == ' ') {
                        journal_name = journal_name.slice(0, -1);
                    }
                    var journal_text = journal_name
    
                    if (data.hits.hits[jrecord].metadata.publication_info[0].hasOwnProperty('journal_volume')) {
                        var journal_volume = data.hits.hits[jrecord].metadata.publication_info[0].journal_volume;
                        journal_text += ', <strong>' + journal_volume + '</strong>';
                    }
    
                    if (data.hits.hits[jrecord].metadata.publication_info[0].hasOwnProperty('page_start')) {
                        var journal_page = data.hits.hits[jrecord].metadata.publication_info[0].page_start;
                        journal_text += ', ' + journal_page;
                    }
    
                    if (data.hits.hits[jrecord].metadata.publication_info[0].hasOwnProperty('year')) {
                        var journal_year = data.hits.hits[jrecord].metadata.publication_info[0].year;
                        journal_text += ', (' + journal_year + ')';
                    }
                }
                else {
                    var journal_text = '';
                }
            }
            catch(TypeError) {
                var journal_text = '';
            }
            finally {
                $('#publications').append('<li><i>' + title + '</i>, <a href=' + arxiv_link + '>' + arxiv_text + '</a> ' + journal_text + '</li>')
            }
        }
        
        

    });
}

getRecentPubs();
