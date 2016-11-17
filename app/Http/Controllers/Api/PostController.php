<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\CompletedForm;
use Carbon\Carbon;
use GuzzleHttp\Client;
use \Storage;
use \Firebase\JWT\JWT;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    /**
     * 
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $json = json_decode($request->input('json'), true);
        $filePath = $request->input('file');

        if (!$json) {
            return response(['error' => 'Missing or invalid json parameter'], 400);
        }

        if (!$filePath) {
            return response(['error' => 'Missing file parameter'], 400);
        }

        $fileName = $this->downloadFile($filePath);

        if (!$fileName) {
            return response(['error' => 'Couldn\'t find the file'], 400);
        }

        $userId = null;
        $token = $request->input('token');
        if ($token) {
            $userData = JWT::decode($token['token'], config('signtechapi.jwt_secret'), ['HS256']);
            $userId = $userData->uid;
        }

        $completedForm = new CompletedForm;
        $completedForm->user_id = $userId;
        $completedForm->form_id = $json['form_id'];
        $completedForm->title = $this->getFormTitleByFormId($completedForm->form_id);
        $completedForm->data = $this->getData($json);
        $completedForm->file = $fileName;
        $completedForm->save();

        return ['success' => true];
    }

    /**
     * Get the form's title through the API
     *
     * @param int $formId
     * @return string
     */
    private function getFormTitleByFormId($formId) {
        $client = new Client;

        $data = [
            'form_params' => [
                'function' => 'form_by_id',
                'id' => $formId
            ]
        ];

        $http_auth_credentials = config('signtechapi.http_auth_credentials');
        if ($http_auth_credentials) {
            $data['auth'] = explode(':', $http_auth_credentials);
        }

        $response = $client->post(config('signtechapi.url'), $data);
        $data = json_decode($response->getBody());

        return $data->form_title;
    }

    /**
     * Get form data (the json field from the request without the form_id field)
     *
     * @param array $json
     * @return array
     */
    private function getData($json) {
        $data = $json;
        unset($data['form_id']);

        return $data;
    }

    /**
     * Download and store file locally
     *
     * @param string $file
     * @return string|boolean false on error
     */
    private function downloadFile($path) {
        $path = base64_decode($path);
        $filename = basename($path);

        // HTTP auth if needed
        $options = [];
        $http_auth_credentials = config('signtechapi.http_auth_credentials');
        if ($http_auth_credentials) {
            $options['http'] = [
                'header' => 'Authorization: Basic ' . base64_encode($http_auth_credentials)
            ];
        }

        try {
            $content = file_get_contents($path, null, stream_context_create($options));
        } catch(\Exception $err) {
            return false;
        }

        Storage::disk('pdfs')->put($filename, $content);
        return $filename;
    }
}
