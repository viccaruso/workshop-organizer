const SUPABASE_URL = 'https://iddyxpegdpnmmnebvghi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwOTAyMSwiZXhwIjoxOTU1MDg1MDIxfQ.v4B-VNkc9Xc9bIM4ig0BrZcgdU2bqx3VGiJiMMYNcis';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getWorkshops() {
    const response = await client
        .from('workshops')
        .select(`*, workshop_participants (*)`);

    return checkError(response);
}

export async function createParticipant(participant) {
    const response = await client
        .from('workshop_participants')
        .insert({
            name: participant.name,
            workshop_id: participant.workshop_id
        });
    
    return checkError(response);
}

export async function deleteParticipant(id) {
    const response = await client
        .from('workshop_participants')
        .delete()
        .match({ id: id })
        .single();

    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
