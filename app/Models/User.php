<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Users table in this application just stores cached data about users from signtechforms.com.
 */
class User extends Model
{
    protected $fillable = [
        'first_name',
        'last_name'
    ];

    /**
     * Update existing or create new user with given userId.
     *
     * @param int $userId id of the user to update
     * @param array $data data to update
     */
    public static function updateOrCreate($userId, $data)
    {
        $user = static::find($userId);

        if (!$user) {
            $user = new static;
            $user->id = $userId;
        }

        foreach ($data as $key => $value) {
            $user->{$key} = $value;
        }

        $user->save();
    }
}