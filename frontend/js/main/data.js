const loadData = async (path, fields) => {
    const response = await fetch(`/api/${path}`);
    if (!response.ok) {
        alert();
        return;
    }

    const json = await response.json();
    fields.forEach(field => {
        if (!(field in json.data)) {
            alert();
            return;
        } 
    });

    return json.data;
}

const uploadData = async (path, data) => {
    const response = await fetch(`/api/${path}`, {
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        alert();
        return;
    }
}

const updateData = async (path, data) => {
    const response = await fetch(`/api/${path}`, {
        method: 'PUT',
        data: data,
        headers: {
            'Content-Type': 'application/json',
        }
    })
}