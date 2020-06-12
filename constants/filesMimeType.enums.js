module.exports = {
    PHOTO_MIMETYPES: [ 'image/jpeg', 'image/png'],
    DOC_MIMETYPES: [
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //docx
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //.xls
    ],
    MAX_PHOTO_SIZE: 3 * 1024 * 1024,
    MAX_DOC_SIZE: 15 * 1024 * 1024,
}
