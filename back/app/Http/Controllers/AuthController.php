<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(UserRequest $request)
    {
        // return $request;
        $user = User::create([
            "telephone" => $request->telephone,
            "name" => $request->name,
            "role" => $request->role,
            "adresse" => $request->adresse,
            "password" => $request->password,
            "succursale_id" => 6
        ]);
        return response($user, Response::HTTP_CREATED);
    }

    public function login(Request $request)
    {
        $credendials = $request->only("telephone", "password");
        if (!Auth::attempt($credendials)) {
            return response([
                "message" => "telephone ou password incorect"
            ], Response::HTTP_UNAUTHORIZED);
        }
        $user = Auth::user();
        $user->load('succursale');
        $token = $user->createToken("token")->plainTextToken;
        $cookie = cookie("token", $token, 24 * 60);

        return response([
            "token" => $token,
            'user'=> $user
        ])->withCookie($cookie);
    }


    public function user(Request $request)
    {
        return $request->user();
    }

    public function logout()
    {
        Auth::logout();
        Cookie::forget("token");
        return response([
            "message" => "success"
        ]);
    }
}
    