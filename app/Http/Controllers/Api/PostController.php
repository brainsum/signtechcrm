<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\CompletedForm;
use Carbon\Carbon;
use App\Helpers\Contracts\SignTechApiContract;
use \Storage;
use \Firebase\JWT\JWT;
use \Symfony\Component\HttpFoundation\File\UploadedFile;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    /**
     * 
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, SignTechApiContract $api)
    {
        $json = json_decode($request->input('json'), true);

        if (!$json) {
            return response(['error' => 'Missing or invalid json parameter'], 400);
        }

        $file = $request->input('file');

        if (!$file) {
            if ($request->hasFile('file')) {
                $file = $request->file('file');
            }
            else {
                return response(['error' => 'Missing file parameter'], 400);
            }
        }

        $fileName = $this->saveFile($file);

        die($fileName);

        if (!$fileName) {
            return response(['error' => 'Couldn\'t find the file'], 400);
        }

        $userId = null;
        $token = $request->input('token');
        if ($token) {
            if (is_array($token)) {
                $token = $token['token'];
            }
            $userData = JWT::decode($token, config('signtechapi.jwt_secret'), ['HS256']);
            $userId = $userData->uid;
        }

        $completedForm = new CompletedForm;
        $completedForm->user_id = $userId;
        $completedForm->form_id = $json['form_id'];
        $completedForm->title = $this->getFormTitleByFormId($api, $completedForm->form_id);
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
    private function getFormTitleByFormId($api, $formId) {
        $params = [
            'function' => 'form_by_id',
            'id' => $formId
        ];

        $response = json_decode($api->request($params));

        return $response->form_title;
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
     * @return string|boolean false on error otherwise name of the stored file
     */
    private function saveFile($file) {
        // Generate a random filename
        $fileName = md5(uniqid() . md5($file)) . '.pdf';

        if ($file instanceof UploadedFile) {
            $content = file_get_contents($file->getRealPath());
        }
        else {
            $file = base64_decode($file);

            // From signtechforms.com web sign we receive an URL
            if (filter_var($file, FILTER_VALIDATE_URL)) { 
                $fileName = basename($file);

                // HTTP auth if needed
                $options = [];
                $http_auth_credentials = config('signtechapi.http_auth_credentials');
                if ($http_auth_credentials) {
                    $options['http'] = [
                        'header' => 'Authorization: Basic ' . base64_encode($http_auth_credentials)
                    ];
                }

                try {
                    $content = file_get_contents($file, null, stream_context_create($options));
                } catch(\Exception $err) {
                    return false;
                }
            }
            // From the apps it's a PDF base64 encoded
            else {
                $content = $file;
            }
        }

        Storage::disk('pdfs')->put($fileName, $content);

        return $fileName;        
    }
}
