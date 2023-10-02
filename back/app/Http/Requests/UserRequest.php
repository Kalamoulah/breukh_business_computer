<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name"  => 'string|required',
            "telephone"=> 'required|numeric|min:9|unique:users',
            // "email"  => 'string|required|email',
            "adresse"  => 'required|string',
            "password"  => 'string|required',
            "password_confirm"  => 'string|required|same:password',
        ];
    }
}
