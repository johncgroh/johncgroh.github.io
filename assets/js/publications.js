function getRecentPubs()
{
    // OK, so the problem here is that some aren't on the arxiv and there's no "arxiv_eprints" in the metadata
    // use DOI instead since that'll always exist
    $.get('https://inspirehep.net/api/literature?sort=mostrecent&size=10&q=find a John C Groh', function(data) {
        for (jrecord = 0; jrecord < data.hits.hits.length; jrecord++) {
            var title = data.hits.hits[jrecord].metadata.titles[0].title;
	    var doi_text = 'doi:' + data.hits.hits[jrecord].metadata.dois[0].value.slice(1,-1);
	    var doi_link = 'https://doi.org/' + data.hits.hits[jrecord].metadata.dois[0].value.slice(1,-1);
            //var arxiv_text = 'arxiv:' + data.hits.hits[jrecord].metadata.arxiv_eprints[0].value;
            //var arxiv_link = 'https://arxiv.org/abs/' + data.hits.hits[jrecord].metadata.arxiv_eprints[0].value;
            if (data.hits.hits[jrecord].metadata.hasOwnProperty('publication_info')) {
                console.log(data.hits.hits[jrecord].metadata.publication_info);
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
            $('#publications').append('<li><i>' + title + '</i>, <a href=' + doi_link + '>' + doi_text + '</a> ' + journal_text + '</li>')
        }
        
        

    });
}

getRecentPubs();
