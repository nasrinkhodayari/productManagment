
angular.module('toastModule', ['ngMaterial'])
    .factory('toastFactory', function($mdToast, $log) {

        let last = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };

        const toastPosition = angular.extend({}, last);

        const getToastPosition = function () {
            sanitizePosition();

            return Object.keys(toastPosition)
                .filter(function (pos) {
                    return toastPosition[pos];
                }).join(' ');
        };

        function sanitizePosition() {
            let current = toastPosition;

            if (current.bottom && last.top) {
                current.top = false;
            }
            if (current.top && last.bottom) {
                current.bottom = false;
            }
            if (current.right && last.left) {
                current.left = false;
            }
            if (current.left && last.right) {
                current.right = false;
            }

            last = angular.extend({}, current);
        }

        const showSimpleToast = function (msg) {
            let pinTo = getToastPosition();
            $mdToast.show(
                $mdToast.simple()
                    .textContent(msg)
                    .position(pinTo)
                    .hideDelay(3000))
                .then(function () {
                    $log.log('Toast dismissed.');
                }).catch(function () {
                    $log.log('Toast failed or was forced to close early by another toast.');
                });
        };

        return { showSimpleToast: showSimpleToast };
    });