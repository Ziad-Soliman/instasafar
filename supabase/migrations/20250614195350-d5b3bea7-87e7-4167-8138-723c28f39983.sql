
-- Update the `role` in auth user's user_metadata
update auth.users 
set raw_user_meta_data = jsonb_set(
    raw_user_meta_data,
    '{role}',
    '"admin"'
)
where email = 'ziad.ashraf.soliman@gmail.com';

-- Update the profiles table if "role" is a dedicated column (otherwise, this step can be omitted)
update public.profiles
set preferred_language = preferred_language -- No change, just touching the row to trigger the sync
where id = (select id from auth.users where email = 'ziad.ashraf.soliman@gmail.com');
