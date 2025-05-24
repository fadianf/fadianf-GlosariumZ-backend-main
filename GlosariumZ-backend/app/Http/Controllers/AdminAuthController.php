<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    // Register API for Admins
    public function register(Request $request)
    {
        $request->validate([
            'username' => 'required|string|unique:admin,username|max:255',
            'password' => 'required|string|min:6'
        ]);

        $admin = Admin::create([
            'id' => Str::uuid(),
            'username' => $request->username,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Admin account created successfully',
            'admin' => $admin
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string'
        ]);

        $admin = Admin::where('username', $request->username)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            throw ValidationException::withMessages([
                'username' => ['Invalid credentials.']
            ]);
        }

        // Generate Token
        $token = $admin->createToken('API Token')->plainTextToken;

        return response()->json([
            'token' => $token
        ]);
    }

    // Logout API for Admins
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }
}
