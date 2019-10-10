export default (obj) => {
    obj.prompt = async (url, parser) => {
        return new Promise(async (resolve, reject) => {
            let frame = window.open(url);
            frame.addEventListener('load', async function(r) {
                var hash = r.target.location.hash.substr(1);

                var result = hash.split('&').reduce(function (result, item) {
                    var parts = item.split('=');
                    result[parts[0]] = parts[1];
                    return result;
                }, {});

                try {
                    let r = parser && await parser(frame, result);
                    if (r) {
                        frame.close();
                        return resolve(r)
                    }
                } catch (e) {
                    frame.close();
                    return reject(e);
                }
            });
        });
    }
}